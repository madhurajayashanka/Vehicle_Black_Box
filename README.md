## **Introduction**

A black box generally refers to a device or system whose internal workings or mechanisms are not readily understandable or accessible to the user or observer. The term "black box" is often used metaphorically to describe any system or process in which the inputs and outputs are known, but the internal workings are hidden or unknown. In technology and engineering, a black box can refer to a piece of hardware or software that performs a specific function, but the details of how it achieves that function are not transparent.

In the context of aviation, a flight data recorder (FDR) or cockpit voice recorder (CVR) is commonly referred to as a "black box." These devices are designed to record critical data and conversations in the event of an aircraft accident. The term "black box" is used because these recorders are often housed in a sturdy and fire-resistant container, typically painted black to aid in their recovery.

In this project, our team created a black box that can be used for other vehicles such as cars, vans, etc. The black box records many important data such as the speed of the vehicle, the route taken by the vehicle, and the location and time of the vehicle. Also, this black box can be used to monitor driving habits, prevent road accidents, and take necessary actions as soon as possible to avoid harm to human life if an accident occurs.

---

## **Objectives**

#### 1. Improving road safety:

The black box can record data on the vehicle's speed, and location, which can be used to help identify dangerous driving habits and assist in accident investigations.

#### 2. Monitoring driver behavior:

The data collected by the black box can be used to monitor the driving behavior of individuals and fleets. This can be useful for insurance companies, fleet managers, and other organizations that need to track and analyze driving data.

#### 3. Enhancing driver training:

The data collected by the black box can be used to provide feedback to drivers on their habits, such as how often they brake hard or accelerate quickly. This information can help drivers improve their habits and become safer on the road.

#### 4. Cost-effective solution:

Having a black box device installed in a vehicle is a cost-effective solution for monitoring and tracking vehicle usage and driver behavior.

#### 5. Identifying the cause of accidents:

By having a black box installed in a vehicle, the cause of an accident can be identified easily, which can help to prevent similar accidents from happening in the future.

#### 6. Customizable:

The black box can be customized to suit the specific needs of different types of vehicles and organizations.

---

## **Functions and Components of the Project**

- Sending a message and obtaining current location.
- SOS message triggered when an impact is detected.
- Uploading data to the cloud.
- Web Application: ReactJs, Firebase - Real-time Data.
- Mobile Application: iOS, Android - Real-time Data.
- RTC Module for retrieving current date and time.
- SD Card data logging as a backup when there is no signal to upload data.
- Gyroscope for sensing vehicle roll over and angle.
- Accelerometer for sensing vehicle acceleration.
- Monitoring shock and vibration of the vehicle.
- Reading vehicle ECU (Engine Control Unit) data using OBD-II (ELM327) via Bluetooth.
- Equipped with a backup battery to power the Black Box in the event of an accident.

---

| Components                                          | Amount |
| --------------------------------------------------- | ------ |
| SIM808 Quad-Band GSM GPRS GPS                       | 1      |
| MPU-6050 Triple Axis Analog Accelerometer Gyroscope | 1      |
| Arduino MEGA Original Development Board             | 1      |
| MicroSD Card Module                                 | 1      |
| CR2032 Lithium Coin Battery                         | 1      |
| DS3231 Precision RTC                                | 1      |
| ELM327 Bluetooth Adapter                            | 1      |
| HC-05 Bluetooth Module                              | 1      |
| 24V 12V To 5V 5A 25W DC- DC Step Down Buck          | 1      |
| 801S Vibration Sensor Switch Detection Module       | 1      |

---

```c
// Bluetooth (HC-05 pair with ELM327) AT Commands - First Time Pairing

#include <SoftwareSerial.h>

SoftwareSerial mySerial(10, 11); // RX, TX

void setup() {
  Serial.begin(9600); // Start the serial communication with the computer
  pinMode(9, OUTPUT);
  digitalWrite(9, HIGH); // Power on the HC-05 module
  Serial.println("Enter AT commands:"); // Prompt the user to enter AT commands
  mySerial.begin(38400); // Start the communication with HC-05 at 38400 baud rate
}

void loop() {
  // Forward data from HC-05 to the serial monitor
  if (mySerial.available())
    Serial.write(mySerial.read());

  // Forward data from the serial monitor to HC-05
  if (Serial.available())
    mySerial.write(Serial.read());
}

```

---

### To pair and configure the HC-05 module for the first time, follow the steps below:

1. Upload the code to your Arduino board without connecting the TX and RX pins of HC-05 to the Arduino. This ensures that the code doesn't interfere with the AT commands we are going to send.

2. Disconnect the VCC (power) wire of the HC-05 module.

3. Reattach the VCC wire while holding down the Mode button on the HC-05 module. This puts the module into AT Commands Mode.

4. Open the Serial Monitor in the Arduino IDE and set the baud rate to 38400.

5. Send the following AT commands one by one in the Serial Monitor:

```c AT
//Mac Address of ELM327 - 00:10:CC:4F:36:03

AT+UART=115200,0,0
AT+CMODE=0
AT+ROLE=1
AT+RESET
AT+INQM=0,5,9
AT+INIT
AT+INQ
AT+PAIR=00,10,CC,4F,36,03,20
AT+BIND=00,10,CC,4F,36,03
AT+LINK=00,10,CC,4F,36,03
AT+RESET

```

After sending the commands, you can close the Serial Monitor and disconnect the HC-05 module.
The above configuration is only needed for the initial pairing and setting the HC-05 module to master mode. Once configured, you can reconnect the TX and RX pins of HC-05 to the Arduino and use the module for Bluetooth communication.

---

## **References**

[https://forum.arduino.cc/t/car-heads-up-display/576252/14](https://forum.arduino.cc/t/car-heads-up-display/576252/14 "https://forum.arduino.cc/t/car-heads-up-display/576252/14")

[https://www.instructables.com/Arduino-OBD2-ELM327-I2C-LCD-HC05-Bluetooth/](https://www.instructables.com/Arduino-OBD2-ELM327-I2C-LCD-HC05-Bluetooth/ "https://www.instructables.com/Arduino-OBD2-ELM327-I2C-LCD-HC05-Bluetooth/")

[https://github.com/PowerBroker2/ELMduino](https://github.com/PowerBroker2/ELMduino "https://github.com/PowerBroker2/ELMduino")
