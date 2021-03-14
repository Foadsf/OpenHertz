clear all; close all; clc;

nu_array = linspace(0, 0.5);
zeta_array = linspace(0, 3);
zeta_m = zeros(1, length(nu_array));
tmp0_m = zeros(1, length(nu_array));

function tmp01_ = tmp01(inputZeta, inputNu)
  tmp01_ = inputZeta - inputZeta .* inputNu + (-1 + 2 .* inputZeta.^2 .* (inputNu - 1) + 2 .* inputNu) ./ 2 ./ sqrt(1 + inputZeta.^2);
end

function tmp02_ = tmp02(inputZeta, inputNu)
  tmp02_ = inputZeta .* (inputZeta ./ sqrt(1 + inputZeta.^2) - 1);
end

function tmp03_ = tmp03(inputZeta, inputNu)
  tmp03_ = (sqrt(1 + inputZeta.^2) - inputZeta) .* inputNu - 1 ./ 2 ./ sqrt(1 + inputZeta.^2);
end

function tmp0_ = tmp0(inputZeta, inputNu)
  tmp0_ = max([-tmp01(inputZeta, inputNu) -tmp02(inputZeta, inputNu) -tmp03(inputZeta, inputNu)]);
end


plot(zeta_array, arrayfun(@(zeta) tmp0(zeta, 0.2), zeta_array)); 

for ii = 1:length(nu_array)
  [zeta_m(ii) = -fminsearch();
end

