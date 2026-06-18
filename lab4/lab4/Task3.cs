using System;
using System.Collections.Generic;
using System.Text;

namespace lab4
{
    public interface INotificationService
    {
        string GetNotificationMessage();
    }

    public class EmailNotification : INotificationService 
    {
        string name;
        public EmailNotification(string name)
        {
            this.name = name;
        }
        public string GetNotificationMessage()
        {
            return $"{this.name} sent you an Email.";
        }
    }

    public class SMSNotification : INotificationService
    {
        string name;
        public SMSNotification(string name)
        {
            this.name = name;
        }
        public string GetNotificationMessage()
        {
            return $"{this.name} sent you an SMS.";
        }
    }
}
