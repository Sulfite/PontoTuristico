using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiPontosTuristicos.Data
{
    public class PontoTuristico
    {
        public int Id { get; set; }
        public string NomePontoTuristico { get; set; }
        public string DescricaoPontoTuristico { get; set; }
        public string EnderecoPontoTuristico { get; set; }
        public string ReferenciaPontoTuristico { get; set; }
        public string CidadePontoTuristico { get; set; }
        public string UfPontoTuristico { get; set; }
        public DateTime DataInclusaoPontoTuristico { get; set; }

    }
}
