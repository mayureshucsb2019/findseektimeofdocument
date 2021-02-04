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

// 88v-2k5-Ydx-2zm
void print_vector(std::vector<string> const &a){
  std::cout << "The elements of the vector are: ";
  for(int i =0; i< a.size(); i++){
    std::cout << a.at(i) << " " ;
  }
  std::cout<<endl;
}

int main(){
  // initialize the initial values and variable 
  int size_of_document = 768*4+256/8*500*5;
  string filename;
  long offset;
  char* buffer = new char[size_of_document*sizeof(char)]; // this will store the random bytes of data
  std::vector<string> file_offset; // this is a vector of filename and offset
  map<std::string, std::vector<string> > umap; // this is the unordered map to store the key and <filename and offset>
  // CHANGE THE NUMBER OF FILES HERE ..................................................................................
  for(int file_number = 1; file_number<101; file_number++){ // make 100 GB of data as 1 file is 1GB
      filename = "file"+to_string(file_number)+".txt" ;
      std::ofstream outfile(filename,std::ifstream::binary); // open a file object
      // We want to write as many documents to make the size of one file to be 1 GB so we need 12634 83KB files
      for(int document_number = 1; document_number< 12634; document_number++ ){
	cout<<"Writing the document number: "<<document_number<<" File number: "<<filename<<endl;
        // Fill the buffer with the random data
        std::memcpy(buffer, (void*)std::memcpy, size_of_document*sizeof(char));
        outfile.write(buffer,size_of_document*sizeof(char)); // write buffer to the file
	// Calculate the offset, and make a vector of document number and offset
	offset = size_of_document*(document_number-1);
	// make a vector of <filename,offset>
	file_offset.push_back(filename);
	file_offset.push_back(to_string(offset));
	// map key --> filename, offset
	umap[filename+to_string(document_number)] = file_offset;
	// clear the vector for next file data
	file_offset.clear();
      }
    outfile.close();// close the file
    // By now we have written 1Gb of file with 12634 documents
  }

  // BY NOW we have 100 GB of data with 1 GB for each file 
  //for (const auto &myPair: umap){
  //  print_vector(umap[myPair.first]);
  //}
  
  // Making a list of random file names
  // Each key of type filename+to_string(document_number) document number are from [1,12634)
  // This will give the offset, which can then be used to seek the file
  offset = 0;
  long time_total = 0;
  long time_total150 = 0;
  // this will run sequential evaluation for 1000 times
  for(int loop=0; loop<1000; loop++){
    for(int file_no = 1; file_no < 150; file_no++ ){
      //string file_name_value = "file1.txt";
      string file_name_value = "file"+to_string(rand()%100+1)+".txt"; // generate a file name
      string document_name_value = to_string(rand()%12634+1); // generate a random document number
      //cout << ".............................................................................................."<<endl;
      //cout << "key is "<<file_name_value+document_name_value << endl;
    
      // GET THE OFFSET FROM THE DICTIONARY
      offset = stol((umap[file_name_value+document_name_value]).at(1), nullptr ,10); // this gives the offset for the document
      //cout << offset <<endl;
      // HERE WE OPEN THE FILE TO READ THE DOCUMENT FOR 83.1KB  ----> START THE TIMER <----
      auto start = std::chrono::high_resolution_clock::now();
      std::ifstream infile(file_name_value, std::ifstream::binary);// opens the file to read the binary data
      infile.seekg(offset); // seek to the position of the offset
      infile.read(buffer, size_of_document); // ----> STOP THE TIMER <----
      auto finish = std::chrono::high_resolution_clock::now();
      // READING HAS BEEN DONE HERE
      time_total += std::chrono::duration_cast<std::chrono::nanoseconds>(finish-start).count();
      std::cout << std::chrono::duration_cast<std::chrono::nanoseconds>(finish-start).count() <<"ns "<<"Average time: "<<time_total/(file_no*(loop+1))<<"............."<<loop<<"......"<<file_name_value+document_name_value<<"Time 150 average: "<<time_total150/(loop+1)<<endl;
      // open a file to save the buffer to check its size to save the buffer
      // BELOW CODE IS CORRECT IT DOES WRITE A BUFFER SIZE OF 83.1KB
      //std::ofstream checkfile("check_file_size.txt",std::ifstream::binary); // open a file object
      //checkfile.write(buffer,size_of_document*sizeof(char)); // write buffer to the file
      //checkfile.close();
      // written to the check file above

      //cout << ".............................................................................................."<<endl; 
      //cout <<sizeof(buffer) << " "<< infile.tellg()<<endl;
      infile.close();
    }
    time_total150 += time_total // this will add all the 150 document fetching time
    cout << "Average time for 150 is "<<time_total150/(loop+1)<<endl;
    time_total = 0;     
  }


  // generate a buffer of selected size
  cout << "buffer generate" <<" " << size_of_document<<endl;
}
