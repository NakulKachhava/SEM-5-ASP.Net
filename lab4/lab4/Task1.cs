using System;
using System.Collections.Generic;
using System.Text;

namespace lab4
{
    internal class Staff
    {
        public int BasicPay = 500;
    }

    internal class Doctor : Staff
    {
        int SpecializedDocAllowance;

        public Doctor(int sda)
        {
            this.SpecializedDocAllowance = sda;   
        }

        public int CalculateTotalPay()
        {
            int totalPay = 0;

            totalPay = this.SpecializedDocAllowance + this.BasicPay;

            return totalPay;
        }
    }
}
