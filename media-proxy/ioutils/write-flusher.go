package ioutils

import (
	"io"
	"net/http"
)

type WriteFlusher struct {
	HTTPFlusher http.Flusher
	io.Writer
}

func (wf WriteFlusher) Flush() error {
	wf.HTTPFlusher.Flush()
	return nil
}
