using System;
using System.Collections.Generic;
using System.Text;

namespace lab4
{
    public abstract class Billing
    {
        public abstract void CalculateBill();
    }

    public class InPatientBilling : Billing
    {
        public override void CalculateBill()
        {
            Console.WriteLine("Enter Room Charge: ");
            int RoomCharge = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Enter Treatment Charge: ");
            int TreatmentCharge = Convert.ToInt32(Console.ReadLine());

            int TotalBilling = RoomCharge + TreatmentCharge;
            Console.WriteLine($"InPatient Billing: {TotalBilling}");
        }
    }

    public class OutPatientBilling : Billing
    {
        public override void CalculateBill()
        {
            Console.WriteLine("Enter Consultation Charge: ");
            int ConsultationCharge = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Enter Medication Charge: ");
            int MedicationCharge = Convert.ToInt32(Console.ReadLine());

            int TotalBilling = ConsultationCharge + MedicationCharge;
            Console.WriteLine($"OutPatient Billing: {TotalBilling}");
        }
    }
}
