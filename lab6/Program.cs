using System.Collections;

namespace lab6
{
    internal class Program
    {
        //    static List<Student> students = new List<Student>();
        //    static void Main(string[] args)
        //    {
        //        int choice = 0;
        //        do
        //        {
        //            Console.WriteLine("1. Add Student");
        //            Console.WriteLine("2. Display Students");
        //            Console.WriteLine("3. Search Student");
        //            Console.WriteLine("4. Update Student");
        //            Console.WriteLine("5. Delete Student");
        //            Console.WriteLine("6. Exit");
        //            Console.Write("Enter your choice: ");
        //            choice = Convert.ToInt32(Console.ReadLine());

        //            switch (choice)
        //            {
        //                case 1:
        //                    AddStudent();
        //                    break;
        //                case 2:
        //                    DisplayStudents();
        //                    break;
        //                case 3:
        //                    SearchStudent();
        //                    break;
        //                case 4:
        //                    UpdateStudent();
        //                    break;
        //                case 5:
        //                    DeleteStudent();
        //                    break;
        //                case 6:
        //                    Console.WriteLine("Exiting...");
        //                    return;
        //                default:
        //                    Console.WriteLine("Invalid choice. Please try again.");
        //                    break;
        //            }
        //        } while (choice != 6);
        //    }

        //    static void AddStudent()
        //    {
        //        Console.WriteLine("Enter Student ID: ");
        //        int id = Convert.ToInt32(Console.ReadLine());
        //        Console.WriteLine("Enter Student Name: ");
        //        string name = Console.ReadLine();
        //        Console.WriteLine("Enter Student Age: ");
        //        int age = Convert.ToInt32(Console.ReadLine());
        //        students.Add(new Student(id, name, age));
        //        Console.WriteLine("Student added successfully.");
        //    }

        //    static void DisplayStudents()
        //    {
        //        if (students.Count == 0)
        //        {
        //            Console.WriteLine("No students to display.");
        //            return;
        //        }
        //        foreach (var student in students)
        //        {
        //            Console.WriteLine($"ID: {student.Id}, Name: {student.Name}, Age: {student.Age}");
        //        }
        //    }

        //    static void SearchStudent()
        //    {
        //        Console.Write("Enter Student ID to search: ");
        //        int id = Convert.ToInt32(Console.ReadLine());
        //        var student = students.Find(s => s.Id == id);
        //        if (student != null)
        //        {
        //            Console.WriteLine($"ID: {student.Id}, Name: {student.Name}, Age: {student.Age}");
        //        }
        //        else
        //        {
        //            Console.WriteLine("Student not found.");
        //        }
        //    }

        //    static void UpdateStudent()
        //    {
        //        Console.Write("Enter Student ID to update: ");
        //        int id = Convert.ToInt32(Console.ReadLine());
        //        var student = students.Find(s => s.Id == id);
        //        if (student != null)
        //        {
        //            Console.Write("Enter new name: ");
        //            student.Name = Console.ReadLine();
        //            Console.Write("Enter new age: ");
        //            student.Age = Convert.ToInt32(Console.ReadLine());
        //            Console.WriteLine("Student updated successfully.");
        //        }
        //        else
        //        {
        //            Console.WriteLine("Student not found.");
        //        }
        //    }

        //    static void DeleteStudent()
        //    {
        //        Console.Write("Enter Student ID to delete: ");
        //        int id = Convert.ToInt32(Console.ReadLine());
        //        var student = students.Find(s => s.Id == id);
        //        if (student != null)
        //        {
        //            students.Remove(student);
        //            Console.WriteLine("Student deleted successfully.");
        //        }
        //        else
        //        {
        //            Console.WriteLine("Student not found.");
        //        }
        //    }





        static List<CartItem> cartitems = new List<CartItem>();
        static void Main(string[] args)
        {
            int choice = 0;
            do
            {
                Console.WriteLine("1. Add Items");
                Console.WriteLine("2. Display Items");
                Console.WriteLine("3. Delete Items");
                Console.WriteLine("4. Calculate Total Amount Of Items: ");
                Console.WriteLine("5. Exit");
                Console.Write("Enter your choice: ");
                choice = Convert.ToInt32(Console.ReadLine());

                switch (choice)
                {
                    case 1:
                        AddItem();
                        break;
                    case 2:
                        DisplayItems();
                        break;
                    case 3:
                        DeleteItem();
                        break;
                    case 4:
                        CalculateTotalAmount();
                        break;
                    case 5:
                        Console.WriteLine("Exiting...");
                        return;
                    default:
                        Console.WriteLine("Invalid choice. Please try again.");
                        break;
                }
            } while (choice != 5);
        }
        static void AddItem()
        {
            Console.Write("Enter Item ID: ");
            int id = Convert.ToInt32(Console.ReadLine());
            Console.Write("Enter Item Name: ");
            string name = Console.ReadLine();
            Console.Write("Enter Item Age: ");
            int age = Convert.ToInt32(Console.ReadLine());
            Console.Write("Enter Item Price: ");
            int price = Convert.ToInt32(Console.ReadLine());
            Console.Write("Enter Item Quantity: ");
            int quantity = Convert.ToInt32(Console.ReadLine());
            cartitems.Add(new CartItem(id, name, price, quantity));
            Console.WriteLine("Item added successfully.");
        }

        static void DisplayItems()
        {
            if (cartitems.Count == 0)
            {
                Console.WriteLine("No Items to display.");
                return;
            }
            foreach (var item in cartitems)
            {
                Console.WriteLine($"ID: {item.id}, Name: {item.name}, Price: {item.price}, Quantity: {item.quantity}");
            }
        }

        static void DeleteItem()
        {
            Console.Write("Enter Item ID to delete: ");
            int id = Convert.ToInt32(Console.ReadLine());
            var item = cartitems.Find(s => s.id == id);
            if (item != null)
            {
                cartitems.Remove(item);
                Console.WriteLine("Item deleted successfully.");
            }
            else
            {
                Console.WriteLine("Item not found.");
            }
        }

        static void CalculateTotalAmount()
        {
            
        }
    }
}
