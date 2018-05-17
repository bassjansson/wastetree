
#define SENSOR_PIN 7

int numOfCups = 0;

void setup()
{
    Serial.begin(9600);
    pinMode(SENSOR_PIN, INPUT);
}
 
void loop()
{
    // First wait till the sensor picked up something
    // Then wait till the sensor is clear again
    while (digitalRead(SENSOR_PIN));
    while (!digitalRead(SENSOR_PIN));

    // Print to serial port and increment number of cups
    Serial.print("Bekertje ging erin! Totaal: ");
    Serial.println(numOfCups);
    numOfCups++;

    // Delay half a second
    delay(500);
}

