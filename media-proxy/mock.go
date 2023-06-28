package main

import (
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

	url := c.String("url")
	for {
		r, w := io.Pipe()

		mw := multipart.NewWriter(w)
		go func() {
			defer mw.Close()
			defer w.Close()
			log.Info("sending frames", "url", url)
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
		}()

		req, err := http.NewRequestWithContext(c.Context, "POST", url, r)
		if err != nil {
			return err
		}
		// set headers for streaming
		req.Header.Set("Content-Type", mw.FormDataContentType())

		log.Info("sending request", "url", url, "headers", req.Header)
		_, err = http.DefaultClient.Do(req)
		if err != nil {
			return err
		}

		log.Info("done sending frames", "url", url)
	}

}
