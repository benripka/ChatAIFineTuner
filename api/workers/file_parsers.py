import textract

def parse_file(file_path):
    # read the file into memory
    text = textract.process(file_path)
    # write to text file
    with open('temp.txt', 'wb') as f:
        f.write(text)


parse_file('/home/ben/Documents/FineTuner/api/spec_sheet.pdf')