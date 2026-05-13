const form = document.getElementById('profit-form');
const sellingPriceInput = document.getElementById('sellingPrice');
const purchaseCostInput = document.getElementById('purchaseCost');
const netProfitText = document.getElementById('netProfit');
const profitPercentText = document.getElementById('profitPercent');
const marginBar = document.getElementById('marginBar');
const marginLabel = document.getElementById('marginLabel');
const statusText = document.getElementById('statusText');

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const sellingPrice = Number.parseFloat(sellingPriceInput.value);
  const purchaseCost = Number.parseFloat(purchaseCostInput.value);

  if (Number.isNaN(sellingPrice) || Number.isNaN(purchaseCost) || sellingPrice < 0 || purchaseCost < 0) {
    statusText.textContent = 'Please enter valid positive numbers for both fields.';
    statusText.className = 'status negative';
    return;
  }

  const netProfit = sellingPrice - purchaseCost;
  const profitPercent = sellingPrice === 0 ? 0 : (netProfit / sellingPrice) * 100;

  netProfitText.textContent = formatCurrency(netProfit);
  profitPercentText.textContent = `${profitPercent.toFixed(2)}%`;

  const boundedPercentage = Math.max(0, Math.min(Math.abs(profitPercent), 100));
  marginBar.style.width = `${boundedPercentage}%`;

  if (netProfit > 0) {
    marginBar.style.background = 'linear-gradient(135deg, #34d399, #10b981)';
    marginLabel.textContent = 'Strong';
    statusText.textContent = `Great! Your business earns ${formatCurrency(netProfit)} profit from this total selling price.`;
    statusText.className = 'status positive';
  } else if (netProfit === 0) {
    marginBar.style.background = 'linear-gradient(135deg, #fbbf24, #f59e0b)';
    marginLabel.textContent = 'Break-even';
    statusText.textContent = 'You are currently at break-even with no gain or loss.';
    statusText.className = 'status';
  } else {
    marginBar.style.background = 'linear-gradient(135deg, #fb7185, #f97316)';
    marginLabel.textContent = 'Loss';
    statusText.textContent = `Warning: You are at a loss of ${formatCurrency(Math.abs(netProfit))}.`;
    statusText.className = 'status negative';
  }
});
