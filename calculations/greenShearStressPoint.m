clear all; close all; clc;

nu_array = linspace(0, 0.5);
zeta_m = zeros(1, length(nu_array));

function dtmdzeta_ = dtmdzeta(zeta, nu)
  dtmdzeta_ = ((nu + 1) * acot(zeta) - ((nu + 1) * zeta) / (zeta^2 + 1) - (3 * zeta) / (zeta^2 + 1)^2) / 2;
end

for ii = 1:length(nu_array)
  fun = @(x) dtmdzeta(x, nu_array(ii));
  zeta_m(ii) = fzero(fun, 0.5);
end

%plot(nu_array, zeta_m)

zeta_m_pol = polyfit(nu_array, zeta_m, 1)

tmm = 2 ./ (-1 + 3 / 2 ./ (1 + zeta_m.^2) - nu_array + zeta_m .* (1 + nu_array) .* acot(zeta_m));

%plot(nu_array, tmm);

tmm_pol = polyfit(nu_array, tmm, 2)