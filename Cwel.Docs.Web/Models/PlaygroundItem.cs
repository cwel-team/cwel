using System;
using System.Web.Compilation;
using Newtonsoft.Json;

namespace Cwel.Docs.Web.Models
{
    public class PlaygroundItem
    {
        public string Type { get; set; }

        public string Name { get; set; }

        public string Data { get; set; }

        public DynamicModel GetModel()
        {
            var view = $"~/Cwel/{Type}/{Name}/{Name}.cshtml";
            var baseType = BuildManager.GetCompiledType(view).BaseType;

            if (baseType == null || !baseType.IsGenericType)
            {
                throw new Exception("Nah");
            }

            var modelType = baseType.GetGenericArguments()[0];
            var vm = JsonConvert.DeserializeObject(Data, modelType);

            return new DynamicModel
            {
                Model = vm,
                View = view,
                Name = Name
            };
        }
    }
}
