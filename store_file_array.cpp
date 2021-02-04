#include <cstdlib>
#include <iostream>
#include <fstream>
#include <map>
#include <vector>
#include <string>
#include <cstring>
#include <stdlib.h>
#include <time.h>
#include <chrono>
using namespace std;

int main(){
  // initialize the initial values and variable 
  int size_of_document = 768*4+256/8*500*5;
  // variable to hold number of files to be made
  int total_files = 100; // initially 100
  string filename;
  long offset;
  // this will store the random bytes of data
  char* buffer = new char[size_of_document*sizeof(char)]; 
  // this is the unordered map to store the key and <filename and offset>
  map<std::string, long > umap; 
  std::ofstream mapfile("mapfile.txt");
  // CHANGE THE NUMBER OF FILES HERE ..................................................................................
  for(int file_number = 1; file_number<total_files+1; file_number++){ // make 100 GB of data as 1 file is 1GB
      filename = "file"+to_string(file_number)+".txt" ;
      // open a file object to write to
      std::ofstream outfile(filename,std::ifstream::binary); 
      // We want to write as many documents to make the size of one file to be 1 GB so we need 12634 83KB files
      for(int document_number = 1; document_number< 12634; document_number++ ){
	//cout<<"Writing the document number: "<<document_number<<" File number: "<<filename<<endl;
        // Fill the buffer with the random data
        std::memcpy(buffer, (void*)std::memcpy, size_of_document*sizeof(char));
        // write buffer to the file
        outfile.write(buffer,size_of_document*sizeof(char)); 
	// Calculate the offset, and make a vector of document number and offset
	offset = size_of_document*(document_number-1);
	//map key --> offset
	mapfile<< "file"+to_string(file_number)+to_string(document_number)+"="+to_string(offset)+"\n";
	umap[filename+to_string(document_number)] = offset;
      }
    cout<<"Written the File number: "<<filename<<endl;
    // close the file
    outfile.close();
    // By now we have written 1Gb of file with 12634 documents
  }
  mapfile.close();
  // ################################## ABOVE CODE HAS GENEARTE THE FILES AND THE HASH MAP ##################################
}
