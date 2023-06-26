package ioutils

import (
	"bufio"
	"bytes"
	"io"
)

type ChannelReader struct {
	readerChan <-chan io.Reader

	reader *bufio.Reader
}

func NewChannelReader(c <-chan io.Reader) *ChannelReader {
	return &ChannelReader{
		readerChan: c,
		reader:     bufio.NewReader(&bytes.Buffer{}),
	}
}

func (c *ChannelReader) Read(p []byte) (n int, err error) {
	if _, err := c.reader.Peek(1); err == io.EOF {
		reader, ok := <-c.readerChan
		if !ok {
			return 0, io.EOF
		}

		c.reader.Reset(reader)
	}

	n, err = c.reader.Read(p)
	if err == io.EOF {
		return n, nil
	}

	return n, err
}
