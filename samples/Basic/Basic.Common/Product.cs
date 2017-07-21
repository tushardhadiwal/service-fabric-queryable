namespace Basic.Common
{
	public sealed class Product
	{
		public string Sku { get; set; }
		public double Price { get; set; }
		public int Quantity { get; set; }

		public Inout Testing { get; set; }

	}
	public class Inout
		{
			public int Entry { get; set; }
			public int Exit { get; set; }
		}
}
