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


            
            // Console.WriteLine("Enter Name: ");
            // string name = Console.ReadLine();

            // EmailNotification en = new EmailNotification(name);
            // SMSNotification sn = new SMSNotification(name);

            // string em = en.GetNotificationMessage();
            // string sm = sn.GetNotificationMessage();

            // Console.WriteLine(em);
            // Console.WriteLine(sm);
            

            
            Console.WriteLine("Enter Type of the Product: ");
            int t = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter Name of the Product: ");
            string name = Console.ReadLine();
            Console.WriteLine("Enter Stock of the Product: ");
            int s = Convert.ToInt32(Console.ReadLine()); ;
            if(t == 1)
            {
                GroceryStock gs = new GroceryStock(name,s);
                Console.WriteLine("Enter Action(1 for add, 2 for sell): ");
                int ac = Convert.ToInt32(Console.ReadLine());
                Console.WriteLine("Enter Quantity of the Product: ");
                int q = Convert.ToInt32(Console.ReadLine());
                if(ac == 1) 
                {
                    gs.AddProduct(name,q);
                }
                else
                {
                    gs.SellProduct(name,q);
                }
            }
            else
            {
                ElectronicStock es = new ElectronicStock(name, s);
                Console.WriteLine("Enter Action(1 for add, 2 for sell): ");
                int ac = Convert.ToInt32(Console.ReadLine()); ;
                Console.WriteLine("Enter Quantity of the Product: ");
                int q = Convert.ToInt32(Console.ReadLine()); ;
                if (ac == 1)
                {
                    es.AddProduct(name, q);
                }
                else
                {
                    es.SellProduct(name, q);
                }
            }
        }
    }
}
