clear all; close all; clc;

% Green, Itzhak. "Poisson ratio effects and critical valus in spherical and cylindrical Hertzian contacts." Applied Mechanics and Engineering 10.3 (2005): 451.

nu_array = linspace(0, 0.5, 1000);
zeta_array = linspace(0, 3, 300);
zeta_m = zeros(1, length(nu_array));
sigma_m = zeros(1, length(nu_array));

zeta_m_1 = zeros(1, length(nu_array));
zeta_m_2 = zeros(1, length(nu_array));
zeta_m_3 = zeros(1, length(nu_array));

sigma_m_1 = zeros(1, length(nu_array));
sigma_m_2 = zeros(1, length(nu_array));
sigma_m_3 = zeros(1, length(nu_array));

function sigmay_ = sigmay(inputZeta)
  sigmay_ = -(-2 * inputZeta + sqrt(1 + inputZeta.^2) * (2 - 1 ./ (1 + inputZeta.^2)));
end

function sigmaz_ = sigmaz(inputZeta)
  sigmaz_ = -1 / sqrt(1 + inputZeta.^2);
end

function sigmax_ = sigmax(inputZeta, inputNu)
  sigmax_ =  -2 * (-inputZeta + sqrt(1 + inputZeta.^2)) .* inputNu;
end

fun_1 = @(x) (sigmaz(x) - sigmay(x)) / 2;
[zeta_1, sigma_1] = fminbnd(fun_1, 0, 3);



function tmp01_ = tmp01(inputZeta, inputNu)
%  tmp01_ = inputZeta - inputZeta .* inputNu + (-1 + 2 .* inputZeta.^2 .* (inputNu - 1) + 2 .* inputNu) ./ 2 ./ sqrt(1 + inputZeta.^2);
  tmp01_ = abs(sigmax(inputZeta, inputNu) - sigmay(inputZeta)) / 2;
end

function tmp02_ = tmp02(inputZeta, inputNu)
%  tmp02_ = inputZeta .* (inputZeta ./ sqrt(1 + inputZeta.^2) - 1);
  tmp02_ = abs(sigmaz(inputZeta) - sigmay(inputZeta)) / 2;
end

function tmp03_ = tmp03(inputZeta, inputNu)
%  tmp03_ = (sqrt(1 + inputZeta.^2) - inputZeta) .* inputNu - 1 ./ 2 ./ sqrt(1 + inputZeta.^2);
  tmp03_ = abs(sigmax(inputZeta, inputNu) - sigmaz(inputZeta)) / 2;
end




function tmp0_ = tmp0(inputZeta, inputNu)
  tmp0_ = max(max(tmp01(inputZeta, inputNu), tmp02(inputZeta)), tmp03(inputZeta, inputNu));
end

%test = tmp0(zeta_array, 0.2);

%plot(zeta_array, tmp0(zeta_array, 0.2));

%plot(zeta_array, arrayfun(@(zeta) tmp0(zeta, 0.2), zeta_array)); 



%for ii = 1:length(nu_array)
%  fun = @(x) -tmp0(x, nu_array(ii));
%  [zeta_m(ii), sigma_m(ii)] = fminbnd(fun, 0, 3);
%end

%plot(nu_array, zeta_m);

%for ii = 1:length(nu_array)
%  fun1 = @(x) -tmp01(x, nu_array(ii));
%  [zeta_m_1(ii), sigma_m_1(ii)] = fminbnd(fun1, 0, 3);
%end

%for ii = 1:length(nu_array)
%  fun2 = @(x) -tmp02(x);
%  [zeta_m_2(ii), sigma_m_2(ii)] = fminbnd(fun2, 0, 3);
%end

for ii = 1:length(nu_array)
  fun3 = @(x) -tmp03(x, nu_array(ii));
  [zeta_m_3(ii), sigma_m_3(ii)] = fminbnd(fun3, 0, 3);
end

zeta_m_3_poly = polyfit(nu_array, zeta_m_3, 3)
zeta_m_3_poly_val = polyval(zeta_m_3_poly, nu_array);
plot(nu_array, zeta_m_3, nu_array, zeta_m_3_poly_val);
legend('\zeta_3', '\zeta_f');

%sigma_m_3_poly = polyfit(nu_array, -sigma_m_3, 2);
%sigma_m_3_poly_val = polyval(sigma_m_3_poly, nu_array);
%plot(nu_array, -sigma_m_3, nu_array, sigma_m_3_poly_val);
%legend('\sigma_3', '\sigma_f');

%plot(nu_array, zeta_m_1, nu_array, zeta_m_2, nu_array, zeta_m_3, nu_array, zeta_m);

%legend('\zeta_1', '\zeta_2', '\zeta_3', '\zeta_m')



%plot(nu_array, -sigma_m_1, nu_array, -sigma_m_2, nu_array, -sigma_m_3, nu_array, -sigma_m);

%legend('\sigma_1', '\sigma_2', '\sigma_3', '\sigma_m')


%(2*nu*sqrt(zeta^2+1)+(2*nu*zeta^2)/sqrt(zeta^2+1)-4*nu*zeta)/(2*sqrt(zeta^2+1)) - (zeta*(2*nu*zeta*sqrt(zeta^2+1)-2*nu*zeta^2-2*nu+1))/(2*(zeta^2+1)^(3/2))

% if 0.2415 < nu 
% then zeta ? 0.7861 
% and sigma ? 0.3003

% if nu < 0.2415
% then zeta ? 2.2694 * nu^3 - 1.6849 * nu^2 + 1.8433 * nu + 2.8898e-03
% and sigma ? 0.4767 * nu^2 - 0.9302 * nu + 0.4976 

