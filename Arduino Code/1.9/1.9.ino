#include <DS3231.h>
#include <DFRobot_sim808.h>
#include <SoftwareSerial.h>
#include <SD.h>
#include "ELMduino.h"
#include <MPU6050.h>


DS3231 rtc(2, 3);
SoftwareSerial mySerial(10, 11); //sim808 serial
DFRobot_SIM808 sim808(&mySerial);  //Connect RX,TX,PWR, 
SoftwareSerial obdSerial(0,1); // RX, TX obd
const int chipSelect = 53;
const int sensorPin = A0;  // analog input pin for the sensor


#define PHONE_NUMBER1 "94769439154"
#define PHONE_NUMBER2 "94713651522"
#define MESSAGE_LENGTH 5
#define ELM_PORT obdSerial
const int threshold = 800;  // vibration threshold
int sensorValue;
char latStr[15];
char lonStr[15];
char message[5];
int messageIndex = 0;
char phone[16];
char datetime[24];
String date;
String time;
char MESSAGE[300];
float lat, lon, speed;
ELM327 myELM327;
MPU6050 mpu;
int rpm = 0;
float fuel = 0;
int ax, ay, az;
int gx, gy, gz;



void setup() {
  rtc.begin();
  mySerial.begin(9600);
  Serial.begin(9600);

  //******** Initialize SD Card module *************
  if (!SD.begin(chipSelect)) {
    Serial.println("SD card initialization failed");
    return;
  }
  Serial.println("SD card initialized");

  //******** Initialize sim808 module *************
  while (!sim808.init()) {
    delay(2000);

    Serial.print("Sim808 init error\r\n");
  }
  Serial.println("Sim808 init success");

  //******** Set Date and Time *************
  rtc.setDate(16, 6, 2023);
  rtc.setTime(12, 19, 30);

  //************* Turn on the GPS power************
  if (sim808.attachGPS()){
    Serial.println("Open the GPS power success");
    
}
  else
    Serial.println("Open the GPS power failure");



  //******** Initialize ELM327 module *************
 if (!myELM327.begin(ELM_PORT, true, 2000))
 {
   Serial.println("Couldn't connect to OBD scanner");
 }

 Serial.println("Connected to ELM327");

//******** Initialize Gyroscope module *************
  mpu.initialize();
  
  Serial.println("MPU-6050 Test");
  
  Serial.println("Initializing MPU6050...");
  mpu.initialize();
  
  Serial.println("Testing MPU6050 connection...");
  Serial.println(mpu.testConnection() ? "MPU6050 connection successful" : "MPU6050 connection failed");

  delay(1000);
}




void loop() {
  if (sim808.getGPS()) {
    getGPSData();
    getECUData();
    delay(2000);
    sensorValue = analogRead(sensorPin);
    gyro();
    date = rtc.getDateStr();
    time = rtc.getTimeStr();
    Serial.print("date: ");
    Serial.println(date);
    Serial.print("time: ");
    Serial.println(time);
    messageIndex = sim808.isSMSunread();
    Serial.print("messageIndex: ");
    Serial.println(messageIndex);


  dtostrf(lat, 10, 7, latStr);  // convert the latitude float to a string with 7 decimal places
  dtostrf(lon, 10, 7, lonStr);  // convert the longitude float to a string with 7 decimal places
if(sensorValue>threshold){
  sosTriger();
}
    upload();
  }
}

void getECUData(){
  float tempRPM = myELM327.rpm();
  float tempFuel = myELM327.fuelLevel();

 if (myELM327.nb_rx_state == ELM_SUCCESS)
 {
   rpm = (int)tempRPM;
   fuel = (float)tempFuel;
   Serial.print("RPM: "); Serial.println(rpm);
   Serial.print("Fuel Level: "); Serial.println(fuel);
 }
 else if (myELM327.nb_rx_state != ELM_GETTING_MSG)
   myELM327.printError();
}

void sosTriger(){
  String MESSAGE = "Impact Detected! https://www.google.com/maps/search/?api=1&query=" + String(latStr) + "," + String(lonStr);
  MESSAGE.replace("query= ", "query=");
  sim808.sendSMS(PHONE_NUMBER1, MESSAGE.c_str());
  sim808.sendSMS(PHONE_NUMBER2, MESSAGE.c_str());
  Serial.print(MESSAGE);
}

void fileWrite() {
  File dataFile = SD.open("data.csv", FILE_WRITE);

  if (dataFile) {
    dataFile.print(date);
    dataFile.print(",");
    dataFile.print(time);
    dataFile.print(",");
    dataFile.print(latStr);  
    dataFile.print(",");  
    dataFile.print(lonStr); 
    dataFile.print(",");
    dataFile.print(speed); 
    dataFile.print(",");
    dataFile.print(rpm); 
    dataFile.print(",");
    dataFile.print(fuel); 
    dataFile.print(",");
    dataFile.print(ax); 
    dataFile.print(",");
    dataFile.print(ay); 
    dataFile.print(",");
    dataFile.print(az); 
    dataFile.print(",");
    dataFile.print(gx); 
    dataFile.print(",");
    dataFile.print(gy); 
    dataFile.print(",");
    dataFile.print(gz); 
    dataFile.print(",");
    dataFile.print(sensorValue);
    dataFile.print(",");
    dataFile.println();  // end the line
    dataFile.close();
    Serial.println("Data written to file");
  } else {
    Serial.println("Error opening file");
  }
}
void gyro(){
  mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);
  
  // Print the raw data
  Serial.print("Raw Accel Data: ");
  Serial.print("X = "); Serial.print(ax);
  Serial.print(", Y = "); Serial.print(ay);
  Serial.print(", Z = "); Serial.println(az);
  
  Serial.print("Raw Gyro Data: ");
  Serial.print("X = "); Serial.print(gx);
  Serial.print(", Y = "); Serial.print(gy);
  Serial.print(", Z = "); Serial.println(gz);
  delay(2000);
  
}

void upload() {

  fileWrite();
  if (mySerial.available())
    Serial.write(mySerial.read());

  mySerial.println("AT");
  delay(1000);

  mySerial.println("AT+CPIN?");
  delay(1000);

  mySerial.println("AT+CREG?");
  delay(1000);

  mySerial.println("AT+CGATT?");
  delay(1000);

  mySerial.println("AT+CIPSHUT");
  delay(1000);

  mySerial.println("AT+CIPSTATUS");
  delay(2000);

  mySerial.println("AT+CIPMUX=0");
  delay(2000);

  ShowSerialData();

  mySerial.println("AT+CSTT=\"dialogbb\"");  //start task and setting the APN,
  delay(1000);

  ShowSerialData();

  mySerial.println("AT+CIICR");  //bring up wireless connection
  delay(3000);

  ShowSerialData();

  mySerial.println("AT+CIFSR");  //get local IP adress
  delay(2000);

  ShowSerialData();

  mySerial.println("AT+CIPSPRT=0");
  delay(3000);

  ShowSerialData();

  mySerial.println("AT+CIPSTART=\"TCP\",\"api.thingspeak.com\",\"80\"");  //start up the connection
  delay(2000);

  ShowSerialData();

  mySerial.println("AT+CIPSEND");  //begin send data to remote server
  delay(4000);
  ShowSerialData();

  String str = "GET https://api.thingspeak.com/update?api_key=DTUJH2YW8QKCOG4F&field1=" + String(latStr) + "&field2=" + String(lonStr) + "&field3=" + time + "&field4=" + date + "&field5=" + speed+ "&field6=" + sensorValue+ "&field7=" + rpm+"&field8=" + fuel;
  str.replace("field1= ", "field1=");  // remove the space between the latitude/longitude and "&field3"

  Serial.println(str);
  mySerial.println(str);  //begin send data to remote server

  delay(4000);
  ShowSerialData();

  mySerial.println((char)26);  //sending
  delay(2000);                 //waitting for reply, important! the time is base on the condition of internet
  mySerial.println();

  ShowSerialData();

  mySerial.println("AT+CIPSHUT");  //close the connection
  delay(100);
  ShowSerialData();
  delay(2000);

  if (messageIndex > 0) {
    sim808.readSMS(messageIndex, message, MESSAGE_LENGTH, phone, datetime);
    sim808.deleteSMS(messageIndex);

    Serial.println("AT+CMGF=1");
    delay(2000);
    Serial.print("AT+CMGDA=");
    Serial.write(34);
    Serial.print("DEL ALL");
    Serial.write(34);
    Serial.write(13);
    Serial.write(10);
    msg();
  }
}



void getGPSData() {
  lat = (sim808.GPSdata.lat);
  lon = (sim808.GPSdata.lon);
  speed = sim808.GPSdata.speed_kph;

  Serial.print("latitude :");
  Serial.println(lat, 5);
  Serial.print("longitude :");
  Serial.println(lon, 5);
  Serial.print("speed_kph :");
  Serial.println(speed, 5);
}



void msg() {
  String MESSAGE = "https://www.google.com/maps/search/?api=1&query=" + String(latStr) + "," + String(lonStr);
  MESSAGE.replace("query= ", "query=");
  sim808.sendSMS(PHONE_NUMBER1, MESSAGE.c_str());
  sim808.sendSMS(PHONE_NUMBER2, MESSAGE.c_str());
  Serial.print(MESSAGE);
}


void ShowSerialData() {
  while (mySerial.available() != 0)
    Serial.write(mySerial.read());
  delay(1000);
}