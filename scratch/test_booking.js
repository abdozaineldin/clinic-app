const { createClient } = require("@supabase/supabase-js");

const url = "https://bftfrqoihmkkyzqjoruo.supabase.co";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmdGZycW9paG1ra3l6cWpvcnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczNTA1OTMsImV4cCI6MjEwMjkyNjU5M30.v_mFFjlS74NA8xMr6FAQ7eTnWMFIKtsJLHoElmehiUg";
const serviceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmdGZycW9paG1ra3l6cWpvcnVvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzM1MDU5MywiZXhwIjoyMTAyOTI2NTkzfQ.Emwa2AYb9LtdNO0nXt86JuY5eGS0aZ7BHxW8gq_wuzE";

const anonClient = createClient(url, anonKey);
const serviceClient = createClient(url, serviceKey);

async function run() {
  console.log("=== 1. Fetching Branches ===");
  const { data: branches, error: bErr } = await anonClient.from("branches").select("id, name");
  console.log("Branches:", branches, "Error:", bErr);

  console.log("\n=== 2. Fetching Services ===");
  const { data: services, error: sErr } = await anonClient.from("services").select("id, title");
  console.log("Services:", services, "Error:", sErr);

  if (branches && branches.length > 0 && services && services.length > 0) {
    const branchId = branches[0].id;
    const serviceId = services[0].id;
    console.log(`\n=== 3. Testing Anon Insert into bookings (branch_id: ${branchId}, service_id: ${serviceId}) ===`);
    const { data: bData, error: insertErr } = await anonClient
      .from("bookings")
      .insert({
        branch_id: Number(branchId),
        service_id: Number(serviceId),
        date: "2026-08-25",
        time: "10:00 AM",
        patient_name: "Test Patient",
        patient_phone: "01234567890",
        patient_email: "test@example.com",
        status: "pending",
      })
      .select()
      .single();

    console.log("Anon Insert Result:", bData);
    console.log("Anon Insert Error:", JSON.stringify(insertErr, null, 2));
  }

  console.log("\n=== 4. Querying pg_policies for bookings via service role rpc/query if possible or select ===");
  const { data: bookingsAll, error: bAllErr } = await serviceClient.from("bookings").select("*");
  console.log("Service client bookings count:", bookingsAll?.length, "Error:", bAllErr);
}

run();
