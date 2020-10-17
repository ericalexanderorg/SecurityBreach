import csv
import json
import etl as base

def main():
    # Pull in breach data
    data = base.get_summrys()
    # Define essential tags
    essential_tags = base.get_essential_tags()

    print('Creating CSV files')
    csv_columns = ['Tag','Data']
    # Write out classified and test csv files
    for t in data:
        for tag in essential_tags:
            csv_file = "../DATA/CSV/{}-{}.csv".format(t,tag)
            #try:
            with open(csv_file, 'w') as csvfile:
                print('Opened {}'.format(csv_file))
                writer = csv.DictWriter(csvfile, fieldnames=csv_columns)
                writer.writeheader()
                for d in data[t][tag]:
                    try:
                        writer.writerow(d)
                    except:
                        print("Error writing the following data to file {}: {}".format(csv_file,d))
            #except IOError:
            #    print("I/O error writing file {}".format(csv_file)) 


if __name__ == "__main__":
    main()
