export interface AstronautData {
    id: string
    name: String
    description: String
    effect: String
    values: [String]
    belongs_to: [String]
    catagory: [String]
    attached_to: [String]
    is_live: Boolean
    severity: String
    bp : String
    oxygen_level: String
    Actuators : String 
    leak_detection: String
    rapid_pressurization: String
    regulated_pressure: String
    respiration_rate: String
    body_temperature: String
}

export type AttachmentResultsProps= {
  showRespirationRate: boolean | undefined
  showBodyTemperature: boolean | undefined;
  showBloodOxygen: boolean | undefined;
  showRegulatedPressure: boolean | undefined;
  showLeakDetection: boolean | undefined;
  showHeartRate: boolean | undefined;
  showActuators: boolean | undefined;
  showBloodPressure: boolean | undefined;
  // astronautsData: AstronautData[] | null
}

export type PartialAttachmentResultsProps = Partial<AttachmentResultsProps>;

export const processAttachmentResults = (props: PartialAttachmentResultsProps) => {
  // Access properties safely since they are optional
  if (props.showRespirationRate) {
    console.log("Respiration Rate is enabled");
  }
  if (props.showBodyTemperature) {
    console.log("Body Temperature is enabled");
  }
  if (props.showBloodOxygen) {
    console.log("Blood Oxygen is enabled");
  }
  if (props.showRegulatedPressure) {
    console.log("Regulated Pressure is enabled");
  }
  if (props.showLeakDetection) {
    console.log("Leak Detection is enabled");
  }
  if (props.showHeartRate) {
    console.log("Heart Rate is enabled");
  }
  if (props.showActuators) {
    console.log("Actuators are enabled");
  }
  if (props.showBloodPressure) {
    console.log("Blood Pressure is enabled");
  }

};