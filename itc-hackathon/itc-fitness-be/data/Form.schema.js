export const formSchema = {
  type: "object",
  properties: {
    TimeOfDay: { type: "number" },
    TypeOfClass: { type: "string" },
    MaxParticipants: { type: "number" },
    Duration: { type: "number" },
    DayOfWeek: { type: "number" },
    Month: { type: "number" },
  },
  required: [
    "TimeOfDay",
    "TypeOfClass",
    "MaxParticipants",
    "Duration",
    "DayOfWeek",
    "Month",
  ],
  additionalProperties: false,
};
