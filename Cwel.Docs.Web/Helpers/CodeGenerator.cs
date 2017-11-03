namespace Cwel.Docs.Web.Helpers
{
    public class CodeGenerator
    {
        public static string GenerateCode(int id)
        {
            return Base62.ToBase62(PermuteId((uint)id));
        }

        public static int GetId(string code)
        {
            return (int)PermuteId(Base62.FromBase62(code));
        }

        private static double RoundFunction(uint input)
        {
            // Must be a function in the mathematical sense (x=y implies f(x)=f(y))
            // but it doesn't have to be reversible.
            // Must return a value between 0 and 1
            return (((1369 * input) + 150889) % 714025) / 714025.0;
        }

        // Feistel cipher
        private static uint PermuteId(uint id)
        {
            var l1 = (id >> 16) & 65535;
            var r1 = id & 65535;
            for (var i = 0; i < 3; i++)
            {
                var l2 = r1;
                var r2 = l1 ^ (uint)(RoundFunction(r1) * 65535);
                l1 = l2;
                r1 = r2;
            }

            return (r1 << 16) + l1;
        }
    }
}
