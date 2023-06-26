package main_test

import (
	"bufio"
	"bytes"
	"context"
	"fmt"
	"io"
	"io/fs"
	"mime/multipart"
	"net/http"
	"os"
	"sort"
	"testing"
)

const framesFolder = "test-data/frames"
const localAddr = "http://localhost:8089"

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

	rawb := &bytes.Buffer{}
	buf := bufio.NewReader(rawb)
	req, _ := http.NewRequestWithContext(context.TODO(), "POST", localAddr+"/video/test", buf)

	mw := multipart.NewWriter(rawb)
	for _, file := range files {
		f, err := fsD.Open(file)
		if err != nil {
			t.Fatal(err)
		}

		w, err := mw.CreateFormFile("file", file)
		if err != nil {
			t.Fatal(err)
		}

		io.Copy(w, f)
	}
	mw.Close()

	req.Header.Set("Content-Type", mw.FormDataContentType())

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatal(err)
	}

	t.Log(resp.StatusCode)
}
