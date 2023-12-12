data = []
validAddress = []

inFile = open("Food1.csv" , 'r')

for line in inFile:
    # Split the line into columns
    columns = line.split(',')
    
    # Check if the length of columns is greater than 8
    if len(columns) > 8:
        # Check if the state is 'AL'
        if columns[8].strip() == 'AL':
            validAddress.append(columns)

inFile.close()  # Don't forget to close the file when you're done

print(validAddress)

outFile = open("data.txt", 'a')

for address in validAddress:
    # Convert the list to a comma-separated string
    line = ','.join(address)
    
    # Write the line to the file
    outFile.write(line)

outFile.close() 