package ioutils

import (
	"bufio"
	"io"
	"io/fs"
)

type jpegToMJPEGReader struct {
	files  []string
	dir    fs.FS
	offset int

	buf *bufio.Reader

	currentFile fs.File
}

func (m *jpegToMJPEGReader) Read(p []byte) (n int, err error) {
	if m.currentFile == nil {
		m.currentFile, err = m.dir.Open(m.files[m.offset])
		if err != nil {
			return 0, err
		}

		m.buf = bufio.NewReader(m.currentFile)
	}

	n, err = m.buf.Read(p)
	if err == io.EOF {
		m.currentFile.Close()
		if m.offset == len(m.files)-1 {
			return n, err
		}

		m.offset++
		m.currentFile = nil
		return n, nil
	}

	return n, err
}

func (m *jpegToMJPEGReader) Close() error {
	if m.currentFile != nil {
		return m.currentFile.Close()
	}

	return nil
}
