
#define SENSOR_PIN_1 4
#define SENSOR_PIN_2 7
#define SENSOR_PIN_3 8

bool sensorRead1 = false;
bool sensorRead2 = false;
bool sensorRead3 = false;

void printSensorTrigger(int sensor)
{
    Serial.print(sensor);
    Serial.println(",1");

    delay(250);
}

void setup()
{
    Serial.begin(9600);

    pinMode(SENSOR_PIN_1, INPUT);
    pinMode(SENSOR_PIN_2, INPUT);
    pinMode(SENSOR_PIN_3, INPUT);
}

void loop()
{
    bool sr1 = !digitalRead(SENSOR_PIN_1);
    bool sr2 = !digitalRead(SENSOR_PIN_2);
    bool sr3 = !digitalRead(SENSOR_PIN_3);

    if (sr1 && !sensorRead1) printSensorTrigger(1);
    if (sr2 && !sensorRead2) printSensorTrigger(2);
    if (sr3 && !sensorRead3) printSensorTrigger(3);

    sensorRead1 = sr1;
    sensorRead2 = sr2;
    sensorRead3 = sr3;
}
