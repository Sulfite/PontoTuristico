using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ApiPontosTuristicos.Migrations
{
    public partial class AddDatainclusao : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DataInclusaoPontoTuristico",
                table: "PontoTuristicos",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataInclusaoPontoTuristico",
                table: "PontoTuristicos");
        }
    }
}
