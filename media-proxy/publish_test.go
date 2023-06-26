package main_test

import (
	"context"
	"fmt"
	"io"
	"io/fs"
	"mime/multipart"
	"net/http"
	"os"
	"sort"
	"testing"
	"time"
)

const framesFolder = "test-data/frames"
const localAddr = "http://localhost:8089"
const FPS = 60

func TestPublish(t *testing.T) {
	fsD := os.DirFS(framesFolder)

	files, err := fs.Glob(fsD, "*.jpg")
	if err != nil {
		t.Fatal(err)
	}

	// sort
	sort.Slice(files, func(i, j int) bool {
		var a, b int
		fmt.Sscanf(files[i], "out-%d.jpg", &a)
		fmt.Sscanf(files[j], "out-%d.jpg", &b)
		return a < b
	})

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
			t.Log("sent frame", file)
			time.Sleep(time.Second / FPS)
		}

		mw.Close()
		w.Close()
	}()

	req, _ := http.NewRequestWithContext(context.TODO(), "POST", localAddr+"/video/test", r)
	// set headers for streaming
	req.Header.Set("Content-Type", mw.FormDataContentType())
	req.Header.Set("Transfer-Encoding", "chunked")
	req.Header.Set("Connection", "keep-alive")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatal(err)
	}

	t.Log(resp.Status)
}
