//node seedStudents.js   #runing command
const axios = require("axios");
const { faker } = require("@faker-js/faker");

const API_BASE = "http://localhost:5000/api";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTE2Y2UzOGVlZGQ0MjE2MzIxNDNmYWUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjMyMTI1MTYsImV4cCI6MTc2MzgxNzMxNn0.HWIBYu5jPvpiMvvA3F0G5fu1t1bqJUePtXhfNNnURQk";

const classes = [
  { id: "691752cf737197256606cead", name: "Class 10A" },
  { id: "691752cf737197256606ceae", name: "Class 9B" },
  { id: "691752cf737197256606ceaf", name: "Class 8C" },
  { id: "691752cf737197256606ceb0", name: "Class 7A" },
  { id: "691752cf737197256606ceb1", name: "Class 6B" },
  { id: "691839d9533df309d86b1364", name: "Class 1" },
  { id: "69183a29533df309d86b1375", name: "dsfsdfsf" },
  { id: "691883f9e5c01def4f22fc10", name: "Class 1st A" },
  { id: "69188422e5c01def4f22fc15", name: "Class 1st B" },
  { id: "6919b2d299cea1565f137c07", name: "Class 5" },
  { id: "6919b58a3bc56511a1fbc023", name: "Class 10" },
];

async function createStudent(fullName, email, rollNumber, classId) {
  const res = await axios.post(
    `${API_BASE}/students`,
    {
      fullName,
      email,
      phone: faker.phone.number("##########"),
      password: "password123",
      role: "student",
      gender: faker.person.sexType(),
      dob: faker.date.birthdate({ min: 10, max: 18, mode: "age" }),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        pincode: faker.location.zipCode(),
      },
      qualifications: [faker.word.sample()],
      subjects: [faker.word.sample()],
      admissionNumber: faker.string.alphanumeric(8),
      classId,
      parentName: faker.person.fullName(),
      parentPhone: faker.phone.number("##########"),
    },
    { headers: { Authorization: TOKEN } }
  );
  return res.data.student._id;
}

async function seed() {
  for (const cls of classes) {
    console.log(`Seeding students for ${cls.name}...`);

    const studentIds = [];
    const total = faker.number.int({ min: 15, max: 20 });

    for (let i = 1; i <= total; i++) {
      const fullName = faker.person.fullName();
      const email = faker.internet.email({
        firstName: fullName.split(" ")[0],
        lastName: fullName.split(" ")[1] || "student",
      });
      const rollNumber = `${cls.name.replace(/\s/g, "")}-${i}`;

      try {
        const studentId = await createStudent(
          fullName,
          email,
          rollNumber,
          cls.id
        );
        studentIds.push(studentId);
      } catch (err) {
        console.error(
          "❌ Error creating student:",
          err.response?.data || err.message
        );
      }
    }

    try {
      await axios.put(
        `${API_BASE}/classes/${cls.id}`,
        { studentIds },
        { headers: { Authorization: TOKEN } }
      );
      console.log(`✅ Added ${studentIds.length} students to ${cls.name}`);
    } catch (err) {
      console.error(
        "❌ Error attaching students:",
        err.response?.data || err.message
      );
    }
  }
}

seed();
