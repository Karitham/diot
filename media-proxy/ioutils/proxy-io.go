package ioutils

import "io"

type ProxyReader struct {
	OnRead func([]byte)
	Reader io.Reader
}

func (pr ProxyReader) Read(p []byte) (n int, err error) {
	n, err = pr.Reader.Read(p)
	if pr.OnRead != nil {
		pr.OnRead(p[:n])
	}

	return n, err
}

type ProxyWriter struct {
	OnWrite func([]byte)
	Writer  io.Writer
}

func (pw ProxyWriter) Write(p []byte) (n int, err error) {
	if pw.OnWrite != nil {
		pw.OnWrite(p)
	}

	return pw.Writer.Write(p)
}
