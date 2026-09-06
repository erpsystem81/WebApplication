function PageTitle({ title, subtitle }) {
  return (
    <div className="page-title-wrapper">

      <div>
        <h2 className="page-title">
          {title}
        </h2>

        {subtitle && (
          <p className="page-subtitle">
            {subtitle}
          </p>
        )}
      </div>

      <div className="page-title-line"></div>
    </div>
  );
}

export default PageTitle;