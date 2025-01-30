open:
  open http://localhost

serve:
  static-web-server --root .

download:
  curl https://www.unicode.org/Public/UNIDATA/UnicodeData.txt > unicode.txt
