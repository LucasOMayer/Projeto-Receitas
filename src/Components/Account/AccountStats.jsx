function AccountStats() {
  const stats = [
    { label: "Receitas publicadas", value: 3 },
    { label: "Receitas salvas", value: 8 },
    { label: "Comentários feitos", value: 14 },
  ];

  return (
    <section className="account-stats" aria-label="Estatisticas da conta">
      {stats.map((stat) => (
        <div className="account-stat" key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </div>
      ))}
    </section>
  );
}

export default AccountStats;
