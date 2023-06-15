package main

import (
	"context"
	"crypto/rand"
	"os"
	"text/tabwriter"

	"github.com/Karitham/iDIoT/api/session"
	"github.com/Karitham/iDIoT/api/store"
	"github.com/oklog/ulid"
	"github.com/urfave/cli/v2"
	"golang.org/x/crypto/bcrypt"
)

func DB() *cli.Command {
	return &cli.Command{
		Name:  "db",
		Usage: "Database commands",
		Subcommands: []*cli.Command{
			DBUsers(),
			DBKeys(),
		},
	}
}

func DBUsers() *cli.Command {
	return &cli.Command{
		Name:    "users",
		Usage:   "Users commands",
		Aliases: []string{"user"},
		Subcommands: []*cli.Command{
			DBUsersAdd(),
			DBUsersList(),
		},
	}
}

func DBUsersAdd() *cli.Command {
	action := func(c *cli.Context) error {
		s := store.New(context.Background(), c.StringSlice("cass")...)
		defer s.Close()

		perms := session.Permissions{}
		if c.Bool("admin") {
			perms = append(perms, session.PermRoot)
		}

		pass, err := bcrypt.GenerateFromPassword([]byte(c.String("password")), 12)
		if err != nil {
			return err
		}

		u := store.User{
			ID:          ulid.MustNew(ulid.Now(), rand.Reader).String(),
			Name:        c.String("name"),
			Email:       c.String("email"),
			Password:    string(pass),
			Permissions: perms,
		}

		if _, err := s.GetUserByEmail(c.Context, u.Email); err == nil {
			return cli.Exit("User already exists: "+u.Email, 1)
		}

		err = s.CreateUser(c.Context, u)
		if err != nil {
			return err
		}

		log.Info("User created", "id", u.ID)
		return nil
	}

	return &cli.Command{
		Name:   "add",
		Usage:  "Add a user",
		Action: action,
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:     "name",
				Usage:    "Name",
				Required: true,
			},
			&cli.StringFlag{
				Name:     "email",
				Usage:    "Email",
				Required: true,
			},
			&cli.StringFlag{
				Name:     "password",
				Usage:    "Password",
				Required: true,
			},
			&cli.BoolFlag{
				Name:  "admin",
				Usage: "Admin",
			},
		},
	}
}

func DBKeys() *cli.Command {
	return &cli.Command{
		Name:    "key",
		Aliases: []string{"keys"},
		Usage:   "interact with keys",
		Subcommands: []*cli.Command{
			{
				Name:  "rotate",
				Usage: "Rotate keys",
				Action: func(c *cli.Context) error {
					s := store.New(context.Background(), c.StringSlice("cass")...)
					defer s.Close()

					k, err := s.RotateWebpushKey(c.Context)
					if err != nil {
						return err
					}

					log.Info("Keys rotated", "id", k.ID)
					return nil
				},
			},
			{
				Name:  "get",
				Usage: "Get key",
				Action: func(c *cli.Context) error {
					s := store.New(context.Background(), c.StringSlice("cass")...)
					defer s.Close()

					k, err := s.GetWebpushKey(c.Context)
					if err != nil {
						return err
					}

					log.Info("Key", "id", k.ID, "public", k.PublicKey, "private", k.PrivateKey)
					return nil
				},
			},
		},
	}
}

func DBUsersList() *cli.Command {
	action := func(c *cli.Context) error {
		s := store.New(context.Background(), c.StringSlice("cass")...)
		defer s.Close()

		users, err := s.GetUsers(c.Context)
		if err != nil {
			return err
		}

		tw := tabwriter.NewWriter(os.Stdout, 0, 0, 2, ' ', 0)
		tw.Write([]byte("ID\tName\tEmail\n"))
		for _, u := range users {
			tw.Write([]byte(u.ID + "\t" + u.Name + "\t" + u.Email + "\n"))
		}

		return tw.Flush()
	}

	return &cli.Command{
		Name:    "list",
		Aliases: []string{"ls"},
		Usage:   "List users",
		Action:  action,
	}
}
