using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ApiPontosTuristicos.Migrations
{
    public partial class cep : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CepPontoTuristico",
                table: "PontoTuristicos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "PontoTuristicos",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CepPontoTuristico", "DataInclusaoPontoTuristico", "DescricaoPontoTuristico", "EnderecoPontoTuristico", "NomePontoTuristico", "UfPontoTuristico" },
                values: new object[] { 23575460, new DateTime(2021, 6, 28, 17, 4, 32, 0, DateTimeKind.Unspecified), "Cristo Redentor é uma estátua art déco que retrata Jesus Cristo, localizada no topo do Corcovado.", "Parque Nacional da Tijuca", "Cristo Redentor", "RJ" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CepPontoTuristico",
                table: "PontoTuristicos");

            migrationBuilder.UpdateData(
                table: "PontoTuristicos",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DataInclusaoPontoTuristico", "DescricaoPontoTuristico", "EnderecoPontoTuristico", "NomePontoTuristico", "UfPontoTuristico" },
                values: new object[] { new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Grande", "Lapa", "Cristo Reentor", "Rio de Janeiro" });
        }
    }
}
