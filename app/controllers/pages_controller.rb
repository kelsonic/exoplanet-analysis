class PagesController < ApplicationController
  def charts
  end

  def data
    @csv = SmarterCSV.process('./public/planets.csv')
    p @csv[0][:pl_hostname]
  end

  def talk
  end
end
