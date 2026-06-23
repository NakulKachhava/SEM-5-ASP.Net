using System;
using System.Collections.Generic;
using System.Text;

namespace lab5
{
    internal interface IInventoryManager
    {
        void AddProduct(string n, int q);
        void SellProduct(string n, int q);
    }

    public class GroceryStock : IInventoryManager
    {
        public string Name;
        public int Stock;

        public GroceryStock(string name, int stock)
        {
            Name = name;
            Stock = stock;
        }

        public void AddProduct(string n, int q)
        {
            try
            {
                if (q <= 0)
                {
                    throw new Exception("Quantity can't be zero or negative.");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            Stock += q;
        }

        public void SellProduct(string n, int q)
        {
            Stock -= q;
            try
            {
                if (Stock <= 0)
                {
                    throw new Exception("Product Out of Stock, Add New Stock");
                }
            }
            catch (Exception e)
            {
                Stock = 0;
                Console.WriteLine(e.ToString());
            }
            Console.WriteLine($"Current Quantity of the Stock: {Stock}");
        }
    }
    public class ElectronicStock : IInventoryManager
    {
        public string Name;
        public int Stock;
        public ElectronicStock(string name, int stock)
        {
            Name = name;
            Stock = stock;
        }

        public void AddProduct(string n, int q)
        {
            try
            {
                if (q <= 0)
                {
                    throw new Exception("Quantity can't be zero or negative.");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
            Stock += q;
        }

        public void SellProduct(string n, int q)
        {
            Stock -= q;
            try
            {
                if (Stock <= 0)
                {
                    throw new Exception("Product Out of Stock, Add New Stock");
                }
            }
            catch (Exception e)
            {
                Stock = 0;
                Console.WriteLine(e.ToString());
            }
            Console.WriteLine($"Current Quantity of the Stock: {Stock}");
        }
    }
}