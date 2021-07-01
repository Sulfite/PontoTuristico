using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiPontosTuristicos.Data
{
    public class AppBdContext : DbContext
    {
        public AppBdContext(DbContextOptions<AppBdContext> options) : base(options) 
        {
        }

        public DbSet<PontoTuristico> PontoTuristicos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PontoTuristico>()
                .Property(p => p.DescricaoPontoTuristico)
                    .HasMaxLength(100);

            modelBuilder.Entity<PontoTuristico>()
                .HasData(
                    new PontoTuristico
                    {
                         Id =  1, 
                         NomePontoTuristico = "Cristo Redentor",
                         DescricaoPontoTuristico = "Cristo Redentor é uma estátua art déco que retrata Jesus Cristo, localizada no topo do Corcovado.",
                         EnderecoPontoTuristico = "Parque Nacional da Tijuca",
                         ReferenciaPontoTuristico = "",
                         CidadePontoTuristico = "Rio de Janeiro",
                         UfPontoTuristico = "RJ",
                         DataInclusaoPontoTuristico = new DateTime(2021, 06, 28, 17, 4, 32)
                    }
                );;
        }
    }
}
