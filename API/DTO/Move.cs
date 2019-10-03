using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Text.RegularExpressions;

namespace DTO
{
    public enum ContractTypeName { Rock, Papper, Scissors }
    public class Move
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdMove { get; set; }
        public string name { get; set; }
    }
}
