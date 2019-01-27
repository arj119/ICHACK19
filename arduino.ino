typedef struct {
  String key;
  int pin;
  boolean adjustable;
} RoomToPinType;
RoomToPinType mapping[18] = {
  {"BL1", 2, false},
  {"BL2", 3, true},
  {"BH1", 4, false},
  {"CL1", 5, true},
  {"DL1", 6, true},
  {"DL2", 7, false},
  {"DH1", 8, false},
  {"EL1", 9, true},
  {"EL2", 10, false},
  {"LL1", 11, true},
  {"LH1", 12, false},
  {"LF1", 13, false},
  {"GL1", A0, false},
  {"KL1", A1, false},
  {"KF1", A2, false},
  {"KF2", A3, false},
  {"WL1", A4, false},
  {"WH1", A5, false}
};

void setup() {
  Serial.begin(9600);
  for (int i = 0; i < 18; i++) {
    pinMode(mapping[i].pin, OUTPUT);
  };
  Serial.println("R");
}

void loop() {
  if (Serial.available()) {
    String inputFull = Serial.readStringUntil('$');
    String input = inputFull.substring(0, 3);
    if (input == "THR") {
      boolean found = false;
      while (found == false) {
        int randNumber = random(18);
        Serial.println(randNumber);
        if (mapping[randNumber].key.charAt(1) == 'L') {
          int pin = mapping[randNumber].pin;
          if (digitalRead(pin) == HIGH) {
            digitalWrite(pin, LOW);
          }
          else {
            digitalWrite(pin, HIGH);
          }
          found = true;
          break;
        }
        delay(200);
      }

    }
    else {
      for (int i = 0; i < 18; i++) {
        if (input == "RRR") {
          digitalWrite(mapping[i].pin, LOW);
        }
        else if (input == "RLR") {
          if (mapping[i].key.charAt(1) == 'L') {
            digitalWrite(mapping[i].pin, LOW);
          }
        }
        else if (input == "RHR") {
          if (mapping[i].key.charAt(1) == 'H') {
            digitalWrite(mapping[i].pin, LOW);
          }
        }
        else if (input == "TTT"){
          digitalWrite(mapping[i].pin, HIGH);
        }
        else if (input == "RFR") {
          if (mapping[i].key.charAt(1) == 'F') {
            digitalWrite(mapping[i].pin, LOW);
          }
        }
        else if (mapping[i].key == input) {
          int pin = mapping[i].pin;
          if (mapping[i].adjustable == true) {
            String value = inputFull.substring(3);
            if (value == "") {
              if (digitalRead(pin) == HIGH) {
                digitalWrite(pin, LOW);
              }
              else {
                digitalWrite(pin, HIGH);
              }
            }
            else {
              analogWrite(pin, value.toInt());
            }
          }
          else {
            int pin = mapping[i].pin;
            if (digitalRead(pin) == HIGH) {
              digitalWrite(pin, LOW);
            }
            else {
              digitalWrite(pin, HIGH);
            }
          }
          break;
        }
      }

    }

  }
}
