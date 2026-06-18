namespace lab4
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //Console.WriteLine("Enter Specialized Doctor Allowance: ");
            //int sda = Convert.ToInt32(Console.ReadLine());
            //Doctor d = new Doctor(sda);
            //int tp = d.CalculateTotalPay();
            //Console.WriteLine($"Total Pay: {tp}");

            //InPatientBilling ipb = new InPatientBilling();
            //OutPatientBilling opb = new OutPatientBilling();

            //ipb.CalculateBill();
            //opb.CalculateBill();

            Console.WriteLine("Enter Name: ");
            string name = Console.ReadLine();

            EmailNotification en = new EmailNotification(name);
            SMSNotification sn = new SMSNotification(name);

            string em = en.GetNotificationMessage();
            string sm = sn.GetNotificationMessage();

            Console.WriteLine(em);
            Console.WriteLine(sm);


        }
    }
}
