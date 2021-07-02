using Microsoft.EntityFrameworkCore.Migrations;

namespace ApiPontosTuristicos.Migrations
{
    public partial class cep2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "CepPontoTuristico",
                table: "PontoTuristicos",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "PontoTuristicos",
                keyColumn: "Id",
                keyValue: 1,
                column: "CepPontoTuristico",
                value: "23575460");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "CepPontoTuristico",
                table: "PontoTuristicos",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "PontoTuristicos",
                keyColumn: "Id",
                keyValue: 1,
                column: "CepPontoTuristico",
                value: 23575460);
        }
    }
}
