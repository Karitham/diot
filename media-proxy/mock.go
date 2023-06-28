package main

import (
	"context"
	"fmt"
	"io"
	"io/fs"
	"mime/multipart"
	"net/http"
	"os"
	"sort"
	"time"

	"github.com/urfave/cli/v2"
)

const framesFolder = "test-data/frames"

func Mock(c *cli.Context) error {
	fsD := os.DirFS(framesFolder)

	files, err := fs.Glob(fsD, "*.jpg")
	if err != nil {
		return err
	}

	// sort
	sort.Slice(files, func(i, j int) bool {
		var a, b int
		fmt.Sscanf(files[i], "out-%d.jpg", &a)
		fmt.Sscanf(files[j], "out-%d.jpg", &b)
		return a < b
	})

	for {
		r, w := io.Pipe()

		mw := multipart.NewWriter(w)
		go func() {
			for _, file := range files {
				f, err := fsD.Open(file)
				if err != nil {
					panic(err)
				}

				w, err := mw.CreateFormFile(file, file)
				if err != nil {
					panic(err)
				}

				io.Copy(w, f)
				f.Close()
				time.Sleep(time.Second / FPS)
			}

			mw.Close()
			w.Close()
		}()

		req, _ := http.NewRequestWithContext(context.TODO(), "POST", c.String("url"), r)
		// set headers for streaming
		req.Header.Set("Content-Type", mw.FormDataContentType())
		req.Header.Set("Transfer-Encoding", "chunked")
		req.Header.Set("Connection", "keep-alive")

		resp, err := http.DefaultClient.Do(req)
		if err != nil {
			return err
		}

		log.Info("response", "status", resp.Status)
	}
}
