using System;
using System.Collections.Generic;
using System.Text;

namespace lab6
{
    internal class Student
    {
        public int Id;
        public string Name;
        public int Age;

        public Student(int id, string name, int age)
        {
            Id = id;
            Name = name;
            Age = age;
        }
    }
}