using System;
using System.Collections.Generic;
using System.Text;

namespace lab6
{
    internal class CartItem
    {
        public int id;
        public string name;
        public int price;
        public int quantity;

        public CartItem(int id, string name, int price, int qunatity)
        {
            this.id = id;
            this.name = name;
            this.price = price;
            this.quantity = quantity;
        }
    }
}
