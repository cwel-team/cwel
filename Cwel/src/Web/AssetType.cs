namespace Cwel.Web
{
    /// <summary>
    /// Different Assets have different file paths and locations within the solution this enum allows for specifying which Asset type.
    /// </summary>
    public enum AssetType
    {
        /// <summary>
        /// Represents a Component
        /// </summary>
        Component,

        /// <summary>
        /// Represents a Pattern
        /// </summary>
        Pattern,

        /// <summary>
        /// Represents a Vendor assets (i.e. 3rd party)
        /// </summary>
        Vendor
    }
}