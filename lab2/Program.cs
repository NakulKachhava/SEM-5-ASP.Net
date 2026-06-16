namespace lab2
{
    //internal class Task1
    //{
    //    static void Main(string[] args)
    //    {
    //        Console.WriteLine("Enter a Character:");
    //        char ch = Console.ReadKey().KeyChar;
    //        Console.WriteLine();

    //        if (char.IsUpper(ch))
    //        {
    //            Console.WriteLine($"Lowercase: {char.ToLower(ch)}");
    //        }
    //        else if (char.IsLower(ch))
    //        {
    //            Console.WriteLine($"Uppercase: {char.ToUpper(ch)}");
    //        }
    //        else
    //        {
    //            Console.WriteLine("Not an alphabet");
    //        }
    //    }
    //}

    //internal class Task2
    //{
    //    static void Main(string[] args)
    //    {
    //        string ustr = "";
    //        Console.WriteLine("Enter a String:");
    //        string str = Console.ReadLine();
    //        Console.WriteLine();

    //        Console.WriteLine($"Original String: {str}");

    //        foreach (var s in str)
    //        {
    //            if (char.IsUpper(s))
    //            {
    //                ustr += char.ToLower(s);
    //            }
    //            else
    //            {
    //                ustr += char.ToUpper(s);
    //            }
    //        }

    //        Console.WriteLine($"Updated String: {ustr}");
    //    }
    //}

    //internal class Task3
    //{
    //    static void Main(string[] args)
    //    {
    //        Console.WriteLine("Enter a String:");
    //        string s1 = Console.ReadLine();
    //        Console.WriteLine("Enter a Sub-String:");
    //        string s2 = Console.ReadLine();
    //        Console.WriteLine();

    //        if (s1.Contains(s2))
    //        {
    //            Console.WriteLine($"{s1} contains {s2}");
    //        }
    //        else
    //        {
    //            Console.WriteLine($"{s1} does not contain {s2}");
    //        }
    //    }
    //}

    //internal class Task4
    //{
    //    static void Main(string[] args)
    //    {
    //        Console.WriteLine("Enter Size of the array:");
    //        int s = Convert.ToInt32(Console.ReadLine());
    //        int[] a = new int[s];
    //        for (int i = 0; i < s; i++)
    //        {
    //            Console.WriteLine("Enter an element:");
    //            a[i] = Convert.ToInt32(Console.ReadLine());
    //        }

    //        int first = int.MinValue, second = int.MinValue;

    //        for(int i = 0; i < s; i++)
    //        {
    //            if (a[i] > first)
    //            {
    //                first = a[i];
    //            }
    //            else if (a[i] > second && a[i] != first)
    //            {
    //                second = a[i];
    //            }
    //        }

    //        Console.WriteLine($"Second Largest Unique element is {second}");
    //    }
    //}

    //internal class Task5
    //{
    //    static void Main(string[] args)
    //    {
    //        Console.WriteLine("Enter Num1:");
    //        int num1 = Convert.ToInt32(Console.ReadLine());
    //        Console.WriteLine("Enter Operator:");
    //        char ch = Console.ReadKey().KeyChar;
    //        Console.WriteLine();
    //        Console.WriteLine("Enter Num2:");
    //        int num2 = Convert.ToInt32(Console.ReadLine());

    //        double r = 0.0;

    //        switch (ch)
    //        {
    //            case '+': 
    //                r = num1 + num2;
    //                break;
    //            case '-': 
    //                r = num1 - num2;
    //                break;
    //            case '*': 
    //                r = num1 * num2;
    //                break;
    //            case '/':
    //                if(num2 == 0)
    //                {
    //                    Console.WriteLine("Can't divide with 0");
    //                }
    //                else
    //                {
    //                    r = num1 / num2;
    //                }
    //                break;
    //        }

    //        Console.WriteLine($"Result: {r}");
    //    }
    //}

    //internal class Task6
    //{
    //    static void Main(string[] args)
    //    {
    //        Console.WriteLine("Enter Size of the array:");
    //        int s = Convert.ToInt32(Console.ReadLine());
    //        int[] a = new int[s];
    //        int sum = 0;
    //        for (int i = 0; i < s; i++)
    //        {
    //            Console.WriteLine("Enter an element:");
    //            a[i] = Convert.ToInt32(Console.ReadLine());
    //            sum += a[i];
    //        }

    //        Console.WriteLine($"Sum of all the elements is {sum}");
    //    }
    //}

    internal class Task7
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Enter Size of the array:");
            int s = Convert.ToInt32(Console.ReadLine());
            int[] a = new int[s];
            int ec = 0, oc = 0;
            for (int i = 0; i < s; i++)
            {
                Console.WriteLine("Enter an element:");
                a[i] = Convert.ToInt32(Console.ReadLine());
                if (a[i] % 2 == 0)
                {
                    ec++;
                }
                else
                {
                    oc++;
                }
            }

            Console.WriteLine($"Even Count is {ec} | Odd Count is {oc}");
        }
    }
}
