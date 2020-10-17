import os
import tempfile
import hashlib
import etl as base

# Creates directory structure suitable for sklearn or GCP

def transform_name(name):
    # transform name to meet uclassify constraints on names
    name = name.replace(':', '_')
    name = name.replace('?', 'UNKOWN')
    return name

def main():
    # Pull in breach data
    data = base.get_summrys()
    # Loop through our essential tags
    essential_tags = base.get_essential_tags()
    # Create temp directory structure
    #temp_dir = tempfile.mkdtemp()
    temp_dir = '../DATA/SKLEARN'
    print(temp_dir)
    categories=[]
    for etag in essential_tags:
        for d in data['classified'][etag]:
            name = transform_name(d['Tag'])
            if name not in categories:
                categories.append(name)
            # Define our directory path and create if it's not there
            path = "{}/{}/{}".format(temp_dir,etag,name)
            print(path)
            if not os.path.exists(path):
                os.makedirs(path)
            # Write data to a file in our path
            fname = hashlib.sha1(d['Data'].encode('utf-8')).hexdigest()
            path = "{}/{}".format(path,fname)
            f = open(path, "w")
            f.write(d['Data'])

if __name__ == "__main__":
    main()