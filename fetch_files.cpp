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
  // BY NOW we have 100 GB of data with 1 GB for each file 
  // Making a list of random file names
  // Each key of type filename+to_string(document_number) document number are from [1,12634)
  // This will give the offset, which can then be used to seek the file
  // initialize the initial values and variable 
  int size_of_document = 768*4+256/8*500*5;
  int size_of_buffer = 1024*40; //1024*10;
  int total_files = 100; // initially 100 files 1 GB each
  long offset = 0;
  long time_total = 0;
  long average_time = 0;
  int random_file_no = 0;
  int random_document_no = 0;
  int loop_in = 0;
  int loop_out = 0;
  int iter_number= 1000;
  srand(time(0)); //using current time as the seed
  // HERE WE WANT TO EXPERIMENT ON DOCUMENT OF DIFFERENT SIZES
  // size_of_document = 0;
  char* buffer = new char[size_of_buffer*sizeof(char)];
  cout << "Opening array of file object" <<endl;
  // MAKE AN ARRAY OF SIZE total_files OPEN FILES
  std::ifstream files_array[total_files]; // define an array of 100 input filestream
  for(int f_no=0; f_no<total_files; f_no++){
    cout <<"File to open: " <<"file"+to_string(f_no+1)+".txt" << endl;
    files_array[f_no].open( "file"+to_string(f_no+1)+".txt", std::ifstream::binary);// opens the file to read the binary data
  }
  cout << "File objects are now open..." <<endl;
  //string random_document_name[150];
  //int random_file_number[150];
  
  // this will run sequential evaluation for 1000 times
  for(loop_out=0; loop_out<iter_number; loop_out++){//1000
    for(loop_in = 1; loop_in <151; loop_in++ ){//151
      // BELOW IT GENERATES RANDOM DOCUMENT NAME TO GET ITS OFFSET
      // choose one random file to open out of 100 files 
      random_file_no = rand()%total_files ;
      // choose one random document to read out of 12633 files
      random_document_no = rand()%12634 ;
      // Calculate the offset
      offset = size_of_document*(random_document_no);
      std::ifstream &current_file = files_array[random_file_no];
      // HERE WE READ THE DOCUMENT FOR 83.1KB
      auto start = std::chrono::high_resolution_clock::now(); // ----> START THE TIMER <----
      current_file.seekg(offset); // seek to the position of the offset
      current_file.read(buffer, size_of_buffer); // seek the documet from the file
      auto finish = std::chrono::high_resolution_clock::now(); // ----> STOP THE TIMER <----
      // READING HAS BEEN DONE HERE -- Calculate the time to read this file
      time_total += std::chrono::duration_cast<std::chrono::nanoseconds>(finish-start).count();
      //cout << "Opened file number: "<<random_file_no <<" with document number: "<<random_document_no<<"time taken: "<<std::chrono::duration_cast<std::chrono::nanoseconds>(finish-start).count()<<" ns"<<endl;
      current_file.seekg(0);
    }
    average_time = (average_time*(loop_out)+time_total/150)/(loop_out+1);
    //cout<<"Average time after loop: "<<loop_out+1<<" is "<<average_time<<" Total time for 150 fetch is: "<<time_total<<" ns"<<" per file is: "<<time_total/150<<endl;
    //time_total = 0;
    if(loop_out%100 ==0){
    cout<<"Average time at the end : "<<loop_out+1<<" is "<<average_time<<" average ime for last round is: "<<time_total/150<<endl;
    }
    time_total = 0;
  }
  cout<<"Average time at the end : "<<loop_out+1<<" is "<<average_time<<endl;
  // CLOSE ALL THE OPEN FILE POINTERS
  for(int f_no=0; f_no<total_files; f_no++){
    files_array[f_no].close();
  }
  cout<< "All fiels have been closed\n";
}


