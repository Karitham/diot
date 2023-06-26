package ioutils

import (
	"bufio"
	"io"
)

type ChannelReader struct {
	readerChan <-chan io.Reader

	reader *bufio.Reader
}

func NewChannelReader(c <-chan io.Reader) *ChannelReader {
	return &ChannelReader{
		readerChan: c,
		reader:     bufio.NewReader(nil),
	}
}

func (c *ChannelReader) Read(p []byte) (n int, err error) {
	if c.reader.Buffered() == 0 {
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
