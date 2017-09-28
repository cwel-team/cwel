using System;
using System.Linq;

namespace Cwel.Docs.Web.Helpers
{
    public class Base62
    {
        public static char Base62Digit(int d)
        {
            if (d < 26)
            {
                return (char)('a' + d);
            }
            if (d < 52)
            {
                return (char)('A' + d - 26);
            }
            if (d < 62)
            {
                return (char)('0' + d - 52);
            }
            throw new ArgumentException("d");
        }

        public static string ToBase62(uint n)
        {
            var res = "";
            while (n != 0)
            {
                res = Base62Digit((int) (n % 62)) + res;
                n /= 62;
            }
            return res;
        }

        public static int Base62Decode(char c)
        {
            if (c >= '0' && c <= '9')
            {
                return 52 + c - '0';
            }
            if (c >= 'A' && c <= 'Z')
            {
                return 26 + c - 'A';
            }
            if (c >= 'a' && c <= 'z')
            {
                return c - 'a';
            }
            throw new ArgumentException("c");
        }

        public static uint FromBase62(string s)
        {
            return (uint) s.Aggregate(0, (current, c) => current * 62 + Base62Decode(c));
        }
    }
}
